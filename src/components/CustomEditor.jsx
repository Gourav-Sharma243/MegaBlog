import { useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CharacterCount from '@tiptap/extension-character-count';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  Heading1, Heading2, List, ListOrdered, Quote, Code, 
  ImageIcon, Link as LinkIcon, Undo, Redo 
} from 'lucide-react';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const activeClass = "bg-primary-dark text-white shadow-[0_10px_25px_rgba(99,102,241,0.2)]";
  const inactiveClass = "text-text-light/60 dark:text-text-dark/40 hover:bg-gray-100 dark:hover:bg-white/5";
  const baseButtonClass = "p-2.5 rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-center";

  return (
    <div className="flex flex-wrap gap-1.5 p-3 bg-white/50 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5 rounded-t-[20px] items-center">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`${baseButtonClass} ${editor.isActive('bold') ? activeClass : inactiveClass}`}
        type="button" title="Bold"
      >
        <Bold size={18} strokeWidth={editor.isActive('bold') ? 2.5 : 2} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`${baseButtonClass} ${editor.isActive('italic') ? activeClass : inactiveClass}`}
        type="button" title="Italic"
      >
        <Italic size={18} strokeWidth={editor.isActive('italic') ? 2.5 : 2} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`${baseButtonClass} ${editor.isActive('underline') ? activeClass : inactiveClass}`}
        type="button" title="Underline"
      >
        <UnderlineIcon size={18} strokeWidth={editor.isActive('underline') ? 2.5 : 2} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`${baseButtonClass} ${editor.isActive('strike') ? activeClass : inactiveClass}`}
        type="button" title="Strikethrough"
      >
        <Strikethrough size={18} strokeWidth={editor.isActive('strike') ? 2.5 : 2} />
      </button>

      <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-2"></div>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${baseButtonClass} ${editor.isActive('heading', { level: 1 }) ? activeClass : inactiveClass}`}
        type="button" title="Heading 1"
      >
        <Heading1 size={18} strokeWidth={editor.isActive('heading', { level: 1 }) ? 2.5 : 2} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${baseButtonClass} ${editor.isActive('heading', { level: 2 }) ? activeClass : inactiveClass}`}
        type="button" title="Heading 2"
      >
        <Heading2 size={18} strokeWidth={editor.isActive('heading', { level: 2 }) ? 2.5 : 2} />
      </button>

      <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-2"></div>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${baseButtonClass} ${editor.isActive('bulletList') ? activeClass : inactiveClass}`}
        type="button" title="Bullet List"
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${baseButtonClass} ${editor.isActive('orderedList') ? activeClass : inactiveClass}`}
        type="button" title="Ordered List"
      >
        <ListOrdered size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${baseButtonClass} ${editor.isActive('blockquote') ? activeClass : inactiveClass}`}
        type="button" title="Blockquote"
      >
        <Quote size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${baseButtonClass} ${editor.isActive('codeBlock') ? activeClass : inactiveClass}`}
        type="button" title="Code Block"
      >
        <Code size={18} />
      </button>

      <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-2"></div>

      <button onClick={setLink} className={`${baseButtonClass} ${editor.isActive('link') ? activeClass : inactiveClass}`} type="button" title="Add Link">
        <LinkIcon size={18} />
      </button>
      <button onClick={addImage} className={`${baseButtonClass} ${inactiveClass}`} type="button" title="Add Image">
        <ImageIcon size={18} />
      </button>

      <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-2"></div>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={`${baseButtonClass} ${inactiveClass} disabled:opacity-40 disabled:cursor-not-allowed`}
        type="button" title="Undo"
      >
        <Undo size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={`${baseButtonClass} ${inactiveClass} disabled:opacity-40 disabled:cursor-not-allowed`}
        type="button" title="Redo"
      >
        <Redo size={18} />
      </button>
    </div>
  );
};

export default function CustomEditor({ value, onChange, placeholder = "Start writing your post..." }) {
  const getInitialContent = () => {
    if (value) return value;
    const savedDraft = localStorage.getItem('megablog_draft_post');
    return savedDraft ? savedDraft : "";
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      CharacterCount,
    ],
    content: getInitialContent(),
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      localStorage.setItem('megablog_draft_post', html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl dark:prose-invert mx-auto focus:outline-none min-h-[400px] p-8 bg-white/30 dark:bg-surface-dark/20 backdrop-blur-sm',
      },
    },
  });
  
  // Clean draft if value is intentionally cleared by parent (e.g. form submitted)
  useEffect(() => {
    if (value === "" && editor && !editor.isDestroyed) {
         if (editor.getHTML() !== "<p></p>" && editor.getHTML() !== "") {
            editor.commands.setContent("");
            localStorage.removeItem('megablog_draft_post');
         }
    }
  }, [value, editor]);

  return (
    <div className="border border-gray-100 dark:border-white/5 rounded-[32px] shadow-soft focus-within:shadow-[0_20px_50px_rgba(99,102,241,0.1)] focus-within:border-primary-dark/30 transition-all duration-500 overflow-hidden flex flex-col w-full bg-white/50 dark:bg-surface-dark/30">
      <MenuBar editor={editor} />
      <div className="flex-grow custom-scrollbar overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
      <div className="bg-gray-50/50 dark:bg-background-dark/50 border-t border-gray-100 dark:border-white/5 py-4 px-6 text-[13px] font-semibold text-primary-dark/60 flex justify-between rounded-b-[32px]">
        <span>{editor?.storage.characterCount.words()} words written</span>
        <span className="opacity-70">{editor?.storage.characterCount.characters()} characters</span>
      </div>
    </div>
  );
}
