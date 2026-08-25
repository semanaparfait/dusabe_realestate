import React from 'react';
import { BookOpen, Calendar, Clock, User } from 'lucide-react';
import { BLOG_POSTS, type BlogPost } from '../data';

interface BlogProps {
  blogPosts?: BlogPost[];
}

export const Blog: React.FC<BlogProps> = ({ blogPosts }) => {
  const posts = blogPosts && blogPosts.length > 0 ? blogPosts : BLOG_POSTS;

  return (
    <section id="blog" className="relative w-full max-w-[1400px] mx-auto px-6">
      <div className="text-center mb-[60px]">
        <span className="font-heading uppercase tracking-[0.25em] text-[0.85rem] text-accent-gold font-semibold">Articles & News</span>
        <h2 className="text-[2.5rem] mb-4">Latest Real Estate News & Advice</h2>
        <p className="max-w-[600px] mx-auto text-base">
          Read our simple guides on home design, property buying tips, and market news.
        </p>
      </div>

      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-[30px]">
        {posts.map((post) => (
          <div key={post.id} className="rounded-2xl overflow-hidden shadow-card border border-border-light bg-bg-secondary">
            <div className="h-[200px] overflow-hidden relative">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover [transition:transform_0.5s]" />
              <span className="absolute top-4 left-4 z-10 bg-primary text-white py-1.5 px-3.5 rounded-md font-heading text-[0.75rem] font-semibold uppercase tracking-[0.05em]">{post.category}</span>
            </div>

            <div className="p-6">
              <div className="flex gap-4 text-[0.75rem] text-text-tertiary mb-3">
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {post.readTime}
                </span>
              </div>

              <h3 className="text-[1.25rem] mb-3 leading-[1.4]">{post.title}</h3>
              <p className="text-[0.85rem] text-text-secondary mb-5">
                {post.summary}
              </p>

              <div className="flex justify-between items-center border-t border-border-light pt-4">
                <div className="flex items-center gap-2 text-[0.8rem] text-text-primary font-semibold">
                  <div className="bg-bg-tertiary rounded-full p-1.5 flex">
                    <User size={12} />
                  </div>
                  <span>{post.author}</span>
                </div>

                <a href="#blog" className="text-[0.8rem] font-bold text-accent-gold-dark flex items-center gap-1">
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
