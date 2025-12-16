using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DefenceCrm.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddQuestionnaireSubmission : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "QuestionnaireSubmissions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    CompanyName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    Abn = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    CompanySize = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    Industry = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    ContactName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    ContactEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    ContactPhone = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    DefenceIndustry = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: false),
                    DispMember = table.Column<string>(type: "character varying(8)", maxLength: 8, nullable: false),
                    GovernmentPanels = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    NominatedCso = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NominatedSo = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    CsoNotSure = table.Column<bool>(type: "boolean", nullable: false),
                    SoNotSure = table.Column<bool>(type: "boolean", nullable: false),
                    Plan = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    AdminFirstName = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    AdminLastName = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    AdminEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    AdminPhone = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionnaireSubmissions", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuestionnaireSubmissions");
        }
    }
}
