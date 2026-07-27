import React from 'react';
import { BookOpen, Calendar, Clock, User } from 'lucide-react';
import { BLOG_POSTS, type BlogPost } from '../data';

interface BlogProps {
  blogPosts?: BlogPost[];
}

export const Blog: React.FC<BlogProps> = ({ blogPosts }) => {
  const posts = blogPosts && blogPosts.length > 0 ? blogPosts : BLOG_POSTS;

  return (
    <section id="blog" className="container">
      <div className="section-header">
        <span className="section-subtitle">Intellectual Capital</span>
        <h2 className="section-title">AURA Journals & Research</h2>
        <p className="section-desc">
          Professional reviews of architecture shifts, private equity real estate placements, and luxury tax directives.
        </p>
      </div>

      <div className="blog-grid">
        {posts.map((post) => (
          <div key={post.id} className="blog-card glass-panel" style={{ border: '1px solid var(--border-light)', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
            <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
              <img src={post.image} alt={post.title} className="blog-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
              <span className="card-badge" style={{ position: 'absolute', top: '16px', left: '16px' }}>{post.category}</span>
            </div>
            
            <div className="blog-info">
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} /> {post.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {post.readTime}
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', lineHeight: '1.4' }}>{post.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                {post.summary}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <div style={{ background: 'var(--bg-tertiary)', borderRadius: '50%', padding: '6px', display: 'flex' }}>
                    <User size={12} />
                  </div>
                  <span>{post.author}</span>
                </div>
                
                <a href="#blog" style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent-gold-dark)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <BookOpen size={12} /> Read Article
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
