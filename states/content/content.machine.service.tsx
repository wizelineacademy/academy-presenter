import {useMachine} from "@xstate/react/lib";
import {assign, Machine, MachineOptions} from "xstate";
import {useContext} from "react";
import {ServiceContext} from "../../context/service.context";
import {catchError, map, take} from "rxjs/operators";
import {of} from "rxjs";
import {ContentContext, ContentStateSchema} from "./content.machine.schema";
import {
    ContentMachineEvents, DeleteContentFail, DeleteContentSuccess,
    FetchContentFail,
    FetchContentSuccess, SaveContentFail,
    SaveContentSuccess, UpdateContentFail, UpdateContentSuccess
} from "./content.machine.events";
import {BlockContent} from "../../domain/content";
import {contentMachineConfig} from "./content.machine.config";

const byPosition = (a: BlockContent, b: BlockContent) => {
    if (a.position < b.position) {
        return -1;
    }
    if (a.position > b.position) {
        return  1;
    }
};

export const useContent = () => {
    const {contentService} = useContext(ServiceContext);
    const contentMachineOptions: Partial<MachineOptions<ContentContext, ContentMachineEvents>> = {
        services: {
            getAll: (_, event) => {
                return contentService.getAll(event.topicId).pipe(
                    take(1),
                    map((snapshot) => {
                        const blocks: BlockContent[] = snapshot.exists() ? Object.values(snapshot.val()) : [];
                        return new FetchContentSuccess(blocks);
                    }),
                    catchError(e => of(new FetchContentFail(e)))
                );
            },
            saveContent: (_, event) => {
                console.log('saving content now');
                return contentService.save(event.content).pipe(
                    take(1),
                    map((snapshot) => {
                        console.log('event content', event.content);
                        console.log('snapshot.val', snapshot.val());
                        debugger;
                        return new SaveContentSuccess(snapshot.val())
                    }),
                    catchError(e => of(new SaveContentFail(e)))
                );
            },
            updateContent: (_, event) => {
                return contentService.update(event.content).pipe(
                    take(1),
                    map((snapshot) => {
                        return new UpdateContentSuccess(event.content)
                    }),
                    catchError(e => of(new UpdateContentFail(e)))
                )
            },
            deleteContent: (_, event) => {
                return contentService.delete(event.contentId).pipe(
                    take(1),
                    map(() => {
                        return new DeleteContentSuccess(event.contentId)
                    }),
                    catchError(e => of(new DeleteContentFail(e)))
                )
            }
        },
        actions: {
            updateList: assign<ContentContext, FetchContentSuccess>((_, event) => ({
                items: event.blocks.sort(byPosition)
            })),
            addContent: assign<ContentContext, SaveContentSuccess>((ctx, event) => ({
                items: [...ctx.items, event.content].sort(byPosition)
            })),
            updateContent: assign<ContentContext, UpdateContentSuccess>((ctx, event) => {
                const items = ctx.items.map(item => {
                    return item.id === event.content.id ? event.content : item;
                }).sort(byPosition);

                return {
                    items
                }
            }),
            removeContent: assign<ContentContext, DeleteContentSuccess>((ctx, event) => {
                return {
                    items: ctx.items.filter(item => item.id !== event.contentId).sort(byPosition)
                }
            })
        }
    };

    const contentStateMachine = Machine<ContentContext, ContentStateSchema, ContentMachineEvents>(contentMachineConfig)
        .withConfig(contentMachineOptions);

    return useMachine(contentStateMachine);
}
