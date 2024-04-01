using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TechBlog.Core.Domain.Content;
using TechBlog.Core.Models;
using TechBlog.Core.Models.Content;
using TechBlog.Core.Repositories;
using TechBlog.Data.SeedWorks;

namespace TechBlog.Data.Repositories
{
    public class PostRepository(TechBlogContext context, IMapper mapper) : RepositoryBase<Post, Guid>(context), IPostRepository
    {
        private readonly IMapper _mapper = mapper;

        public Task<List<Post>> GetPopularPostsAsync(int count)
        {
            return _context.Posts.OrderByDescending(x => x.ViewCount).Take(count).ToListAsync();
        }

        public async Task<PagedResult<PostInListDto>> GetPostsPagingAsync(string? keyword, Guid? categoryId, int pageIndex = 1, int pageSize = 10)
        {
            var query = _context.Posts.AsQueryable();
            // If keywork filler is not null. Then fillter with keyword
            if (!string.IsNullOrEmpty(keyword))
            {
                query.Where(x => x.Name.Contains(keyword));
            }
            // if categoryId is not null. Then fillter with categoryId
            if (categoryId.HasValue)
            {
                query.Where(x => x.CategoryId == categoryId.Value);
            }
            int totalRow = await query.CountAsync();
            query.OrderByDescending(x => x.DateCreated).Skip((pageIndex - 1) * pageSize).Take(pageSize);
            return new PagedResult<PostInListDto>
            {
                Result = await _mapper.ProjectTo<PostInListDto>(query).ToListAsync(),
                CurrentPage = pageIndex,
                RowCount = totalRow,
                PageSize = pageSize
            };
        }
    }
}
