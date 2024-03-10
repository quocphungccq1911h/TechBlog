using TechBlog.Core.SeedWorks;

namespace TechBlog.Data.SeedWorks
{
    public class UnitOfWork(TechBlogContext context) : IUnitOfWork
    {
        private readonly TechBlogContext _context = context;
        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }
        public void Disposes() => _context.Dispose();
    }
}
