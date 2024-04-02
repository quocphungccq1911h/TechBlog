using AutoMapper;
using TechBlog.Core.Domain.Content;
using TechBlog.Core.Repositories;
using TechBlog.Data.SeedWorks;

namespace TechBlog.Data.Repositories
{
    public class SeriesRepository(TechBlogContext context, IMapper mapper) : RepositoryBase<Series, Guid>(context), ISeriesRepository
    {
        private readonly IMapper _mapper = mapper;
    }
}
