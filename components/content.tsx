// import brace from 'brace';
// import 'brace/mode/javascript';
// import 'brace/mode/c_cpp';
// import 'brace/theme/twilight';
// import 'brace/theme/xcode';
// import AceEditor from 'react-ace';
import React from 'react';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// const CodeEditor = (props) => (
//     <div>
//         <AceEditor
//             mode={'javascript'}
//             theme={'twilight'}
//             onChange={(v) => console.log(v)}
//             name="UNIQUE_ID_OF_DIV"
//             editorProps={{
//                 $blockScrolling: true
//             }}
//             fontSize={21}
//             height='80vh'
//             width='100%'
//         />
//     </div>
// );

export const Editor = ({onChange, content}) => {
    return (
        <CKEditor
            editor={ ClassicEditor }
            data={content}
            config={{
                // removePlugins: ['ImageUpload']
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: {name: 'h2', class: 'text-5xl'}, title: 'Title',  converterPriority: 'high' },
                        { model: 'heading2', view: {name: 'h3', class: 'text-3xl' }, title: 'Subtitle', class: 'text-3xl' }
                    ]
                }
            }}
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                onChange(data);
            } }
            onBlur={ ( event, editor ) => {
                console.log( 'Blur.', editor );
            } }
            onFocus={ ( event, editor ) => {
                console.log( 'Focus.', editor );
            } }
        />
    );
};
