using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Qualitico.Business.Services;
using Qualitico.Data.Entities;
using Qualitico.WebApi.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Qualitico.WebApi.SeedData
{
    internal static class DbInitializer
    {
        public static async Task Initialize(DataContext context, ILogger<DataContext> logger, IHostingEnvironment env)
        {
            context.Database.EnsureCreated();
            // Look for any users.
            if (!context.Users.Any())
            {
                await SeedUser(context, logger);
            }
        }

        private static async Task SeedUser(DataContext context, ILogger<DataContext> logger)
        {
            var anyUserExist = await context.Users.AnyAsync();

            if (!anyUserExist)
            {
                string password = "dragon";
                string userPassword = "1111111";

                UserService userService = new UserService(context);
                await userService.Create(new User { FirstName = "Hub", LastName = "Administrator", Username = "Admin", Role = UserRole.Admin}, password);

                // Add Sub Admin and thr user
                for (int i = 1; i < 10; i++)
                {
                    //adds Sub Admin 
                    var subAdmin = await userService.Create(new User { FirstName = "Sub", LastName = $"Admin {i}", Username = $"Sub-Admin{i}", Role = UserRole.SubAdmin }, password);

                    //adds user 
                    if (i != 4) {
                        await userService.Create(new User { FirstName = "Hub", LastName = $" {i}", Username = $"Hub{i}", Role = UserRole.User, UserSubAdminId = subAdmin.Id}, userPassword);
                    }
                    else if(i == 4){
                        await userService.Create(new User { FirstName = "Hub", LastName = $"4hc", Username = $"Hub4hc", Role = UserRole.User, UserSubAdminId = subAdmin.Id }, userPassword);
                        await userService.Create(new User { FirstName = "Hub", LastName = $"4freight", Username = $"Hub4freight", Role = UserRole.User, UserSubAdminId = subAdmin.Id }, userPassword);
                        await userService.Create(new User { FirstName = "Hub", LastName = $"471alps", Username = $"Hub471alps", Role = UserRole.User, UserSubAdminId = subAdmin.Id }, userPassword);
                        await userService.Create(new User { FirstName = "Hub", LastName = $"4aerospace", Username = $"Hub4aerospace", Role = UserRole.User, UserSubAdminId = subAdmin.Id }, userPassword);
                    }
                }

            }
        }
    }
}
