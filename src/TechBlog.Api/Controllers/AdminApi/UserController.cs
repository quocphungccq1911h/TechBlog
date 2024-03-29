using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TechBlog.Api.Fillters;
using TechBlog.Core.Domain.Identity;
using TechBlog.Core.Models;
using TechBlog.Core.Models.System;
using TechBlog.Core.SeedWorks.Constants;

namespace TechBlog.Api.Controllers.AdminApi
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class UserController(IMapper mapper, UserManager<AppUser> userManager) : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager = userManager;
        private readonly IMapper _mapper = mapper;

        [HttpGet("{id}")]
        [Authorize(Permissions.Users.View)]
        public async Task<ActionResult<UserDto>> GetUserById(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user is null) return NotFound();
            var userDto = _mapper.Map<AppUser, UserDto>(user);
            var roles = await _userManager.GetRolesAsync(user);
            userDto.Roles = roles;
            return Ok(userDto);
        }

        [HttpGet("paging")]
        [Authorize(Permissions.Users.View)]
        public async Task<ActionResult<PagedResult<UserDto>>> GetAllUserPaging(string? keyword, int pageIndex, int pageSize)
        {
            var query = _userManager.Users;

            if (!string.IsNullOrEmpty(keyword))
            {
                query.Where(x => x.FirstName.Contains(keyword)
                    || x.UserName!.Contains(keyword)
                    || x.Email!.Contains(keyword)
                    || x.PhoneNumber!.Contains(keyword)
                );
            }
            int totalRow = await query.CountAsync();
            query.OrderByDescending(x => x.DateCreated).Skip((pageIndex - 1) * pageSize).Take(pageSize);

            var pagedResponse = new PagedResult<UserDto>()
            {
                Result = await _mapper.ProjectTo<UserDto>(query).ToListAsync(),
                PageSize = pageSize,
                CurrentPage = pageIndex,
                PageCount = totalRow
            };
            return Ok(pagedResponse);
        }

        [HttpPost]
        [ValidateModel]
        [Authorize(Permissions.Users.Create)]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
        {
            if (await _userManager.FindByNameAsync(request.UserName) is not null) return BadRequest();
            if (await _userManager.FindByEmailAsync(request.Email) is not null) return BadRequest();
            var user = _mapper.Map<CreateUserRequest, AppUser>(request);
            var result = await _userManager.CreateAsync(user, request.Password);
            if (result.Succeeded) return Ok();
            return BadRequest(string.Join("<br>", result.Errors.Select(x => x.Description)));
        }



    }
}
