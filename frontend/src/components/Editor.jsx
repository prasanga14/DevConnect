import React, { useEffect, useRef } from 'react';
import Codemirror, { modes } from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const editor = Codemirror.fromTextArea(
        document.getElementById('realTimeEditor'),
        {
          mode: { name: 'javascript', json: true },
          theme: 'dracula',
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      // editorRef.setSize(null, '80%');

      editorRef.current = editor;

      editorRef.current.on('change', (instance, changes) => {
        // console.log(`changes`, instance, changes);
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);

        if (origin !== 'setValue') {
          socketRef.current.emit('code-change', {
            roomId,
            code,
          });
        }
      });
    };

    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('code-change', ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off('code-change');
    };
  }, [socketRef.current]);

  return (
    <div className="h-full">
      <textarea className="h-full" id="realTimeEditor"></textarea>
    </div>
  );
};

export default Editor;
