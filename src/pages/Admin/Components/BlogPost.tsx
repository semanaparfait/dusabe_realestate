import React from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import { type BlogPost } from '@/data';

interface BlogPostTabProps {
  blogPosts: BlogPost[];
  onOpenNewBlog: () => void;
  onOpenEditBlog: (b: BlogPost) => void;
  onDeleteBlog: (id: string, title: string) => void;
}

const publishArticleBtnClass = "relative overflow-hidden bg-[linear-gradient(135deg,var(--accent-gold)_0%,var(--accent-gold-dark)_100%)] text-black font-heading font-semibold border-none rounded-lg cursor-pointer shadow-[var(--glow-shadow)] [transition:transform_var(--transition-fast),box-shadow_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 after:content-[''] after:absolute after:top-0 after:-left-3/4 after:w-1/2 after:h-full after:[background:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_100%)] after:[transform:skewX(-25deg)] after:[transition:0.75s] hover:after:[animation:shine_0.85s] flex items-center gap-2 px-6 py-3 text-[0.85rem]";

export const BlogPostTab: React.FC<BlogPostTabProps> = ({
  blogPosts,
  onOpenNewBlog,
  onOpenEditBlog,
  onDeleteBlog
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[1.8rem] font-heading font-bold">AURA Research Journals</h1>
          <p className="text-[0.85rem] text-text-tertiary mt-1">Publish research articles on luxury real estate, taxation, and architecture.</p>
        </div>

        <button
          onClick={onOpenNewBlog}
          className={publishArticleBtnClass}
        >
          <Plus size={16} /> Publish Article
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {blogPosts.map(post => (
          <div key={post.id} className="rounded-2xl border border-border-light bg-bg-secondary overflow-hidden flex flex-col [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] shadow-[var(--glass-shadow)]">
            <img src={post.image} alt={post.title} className="w-full h-[160px] object-cover" />
            <div className="p-5 flex flex-col gap-3 flex-1">
              <div className="flex justify-between text-[0.7rem] text-accent-gold font-semibold">
                <span>{post.category}</span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="text-[1rem] font-bold leading-[1.4]">{post.title}</h3>
              <p className="text-[0.8rem] text-text-secondary leading-[1.4]">{post.summary}</p>

              <div className="mt-auto border-t border-border-light pt-3 flex justify-between items-center">
                <span className="text-[0.75rem] text-text-tertiary">By {post.author}</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => onOpenEditBlog(post)}
                    className="bg-bg-tertiary border border-border-light text-text-primary py-1.5 px-2 rounded cursor-pointer"
                  >
                    <Edit3 size={13} />
                  </button>
                  <button
                    onClick={() => onDeleteBlog(post.id, post.title)}
                    className="bg-red-500/15 border-none text-red-500 py-1.5 px-2 rounded cursor-pointer"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};