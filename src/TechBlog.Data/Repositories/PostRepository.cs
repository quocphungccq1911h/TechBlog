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

        public async Task Approve(Guid id, Guid currentUserId)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post is null) throw new ArgumentException("Bài viết không tồn tại");
            var user = await _context.Users.FindAsync(currentUserId);
            await _context.PostActivityLogs.AddAsync(new PostActivityLog
            {
                Id = Guid.NewGuid(),
                FromStatus = post.Status,
                ToStatus = PostStatus.Published,
                UserId = currentUserId,
                UserName = user!.UserName,
                PostId = id,
                Note = $"{user.UserName} duyệt bài"
            });
            post.Status = PostStatus.Published;
            _context.Posts.Update(post);
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
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(x => x.Name.Contains(keyword));
            }
            if (categoryId.HasValue)
            {
                query = query.Where(x => x.CategoryId == categoryId.Value);
            }
            if (!canApprove)
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

        public async Task<List<SeriesInListDto>> GetAllSeries(Guid postId)
        {
            var query = from pis in _context.PostInSeries
                        join s in _context.Series
                        on pis.SeriesId equals s.Id
                        where pis.PostId == postId
                        select s;
            return await _mapper.ProjectTo<SeriesInListDto>(query).ToListAsync();
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
            if (currentId.HasValue)
            {
                return _context.Posts.AnyAsync(x => x.Slug == slug && x.Id != currentId.Value);
            }
            return _context.Posts.AnyAsync(x => x.Slug == slug);
        }

        public async Task ReturnBack(Guid id, Guid currentUserId, string note)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post is null) throw new ArgumentException("Bài viết không tồn tại");
            var user = await _userManager.FindByIdAsync(currentUserId.ToString());
            await _context.PostActivityLogs.AddAsync(new PostActivityLog
            {
                FromStatus = post.Status,
                ToStatus = PostStatus.Rejected,
                UserId = currentUserId,
                UserName = user?.UserName,
                PostId = post.Id,
                Note = note
            });

            post.Status = PostStatus.Rejected;
            _context.Posts.Update(post);
        }

        public Task SendToApprove(Guid id, Guid currentUserId)
        {
            throw new NotImplementedException();
        }
    }
}
