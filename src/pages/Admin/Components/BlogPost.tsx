import React from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import { type BlogPost } from '@/data';

interface BlogPostTabProps {
  blogPosts: BlogPost[];
  onOpenNewBlog: () => void;
  onOpenEditBlog: (b: BlogPost) => void;
  onDeleteBlog: (id: string, title: string) => void;
}

export const BlogPostTab: React.FC<BlogPostTabProps> = ({
  blogPosts,
  onOpenNewBlog,
  onOpenEditBlog,
  onDeleteBlog
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>AURA Research Journals</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>Publish research articles on luxury real estate, taxation, and architecture.</p>
        </div>

        <button 
          onClick={onOpenNewBlog}
          className="luxury-gold-button shine-hover"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '0.85rem' }}
        >
          <Plus size={16} /> Publish Article
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {blogPosts.map(post => (
          <div key={post.id} className="glass-panel" style={{ borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <img src={post.image} alt={post.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                <span>{post.category}</span>
                <span>{post.readTime}</span>
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', lineHeight: '1.4' }}>{post.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{post.summary}</p>

              <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-light)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>By {post.author}</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button 
                    onClick={() => onOpenEditBlog(post)}
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', padding: '6px 8px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    <Edit3 size={13} />
                  </button>
                  <button 
                    onClick={() => onDeleteBlog(post.id, post.title)}
                    style={{ background: 'rgba(239, 68, 68, 0.15)', border: 'none', color: '#EF4444', padding: '6px 8px', borderRadius: '4px', cursor: 'pointer' }}
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