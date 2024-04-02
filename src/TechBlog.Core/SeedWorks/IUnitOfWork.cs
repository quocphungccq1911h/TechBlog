using TechBlog.Core.Repositories;

namespace TechBlog.Core.SeedWorks
{
    public interface IUnitOfWork
    {
        IPostRepository Posts { get; }
        IPostCategoryRepository PostCategory { get; }
        ISeriesRepository Series { get; }
        Task<int> CompleteAsync();
    }
}
