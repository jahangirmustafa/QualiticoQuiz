using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Qualitico.Data.Entities
{
    public class SubAdminUser
    {
        public int Id { get; set; }
        
        public int SubAdminId { get; set; }
        [ForeignKey(nameof(SubAdminId))]
        public User SubAdmin { get; set; }

        public int UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}
