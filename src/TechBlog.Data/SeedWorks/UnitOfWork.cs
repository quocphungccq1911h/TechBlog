using AutoMapper;
using TechBlog.Core.Repositories;
using TechBlog.Core.SeedWorks;
using TechBlog.Data.Repositories;

namespace TechBlog.Data.SeedWorks
{
    public class UnitOfWork(TechBlogContext context, IMapper mapper) : IUnitOfWork
    {
        private readonly TechBlogContext _context = context;
        public IPostRepository Posts { get; private set; } = new PostRepository(context, mapper);

        public IPostCategoryRepository PostCategory { get; private set; } = new PostCategoryRepository(context, mapper);

        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }
        public void Disposes() => _context.Dispose();
    }
}
