using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TechBlog.Core.Domain.Content;
using TechBlog.Core.Domain.Identity;
using TechBlog.Core.Models;
using TechBlog.Core.Models.Content;
using TechBlog.Core.Repositories;
using TechBlog.Core.SeedWorks.Constants;
using TechBlog.Data.SeedWorks;

namespace TechBlog.Data.Repositories
{
    public class PostRepository(TechBlogContext context, IMapper mapper, UserManager<AppUser> userManager) : RepositoryBase<Post, Guid>(context), IPostRepository
    {
        private readonly IMapper _mapper = mapper;
        private readonly UserManager<AppUser> _userManager = userManager;

        public Task Approve(Guid id, Guid currentUserId)
        {
            throw new NotImplementedException();
        }

        public Task<List<PostActivityLogDto>> GetActivityLogs(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<PagedResult<PostInListDto>> GetAllPaging(string? keyword, Guid currentUserId, Guid? categoryId, int pageIndex = 1, int pageSize = 10)
        {
            var user = await _userManager.FindByIdAsync(currentUserId.ToString());
            if (user is null) throw new ArgumentException("User không tồn tại");

            var roles = await _userManager.GetRolesAsync(user);
            var canApprove = false;
            if (roles.Contains(Roles.Admin))
            {
                canApprove = true;
            }
            else
            {
                canApprove = await _context.RoleClaims.AnyAsync(x => roles.Contains(x.RoleId.ToString()) && x.ClaimValue == Permissions.Posts.Approve);
            }
            var query = _context.Posts.AsQueryable();
            if(!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(x=>x.Name.Contains(keyword));
            }
            if(categoryId.HasValue)
            {
                query = query.Where(x=>x.CategoryId == categoryId.Value);
            }
            if(!canApprove)
            {
                query = query.Where(x => x.AuthorUserId == currentUserId);
            }
            var totalRows = await query.CountAsync();

            query = query.OrderByDescending(x => x.DateCreated)
                         .Skip((pageIndex - 1) * pageSize)
                         .Take(pageSize);
            return new PagedResult<PostInListDto>()
            {
                Result = await _mapper.ProjectTo<PostInListDto>(query).ToListAsync(),
                CurrentPage = pageIndex,
                PageCount = totalRows,
                PageSize = pageSize
            };
        }

        public Task<List<SeriesInListDto>> GetAllSeries(Guid postId)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetReturnReason(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> HasPublishInLast(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> IsSlugAlreadyExisted(string slug, Guid? currentId = null)
        {
            throw new NotImplementedException();
        }

        public Task ReturnBack(Guid id, Guid currentUserId, string note)
        {
            throw new NotImplementedException();
        }

        public Task SendToApprove(Guid id, Guid currentUserId)
        {
            throw new NotImplementedException();
        }
    }
}
