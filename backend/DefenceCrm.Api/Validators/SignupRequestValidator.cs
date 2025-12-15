using System.Text.RegularExpressions;
using DefenceCrm.Api.Contracts.Requests;
using FluentValidation;

namespace DefenceCrm.Api.Validators;

public class SignupRequestValidator : AbstractValidator<SignupRequest>
{
  private const int MinimumPasswordLength = 12;
  private static readonly Regex SpecialCharacterRegex = new("[^a-zA-Z0-9]", RegexOptions.Compiled);

  public SignupRequestValidator()
  {
    RuleFor(x => x.Email)
      .NotEmpty()
      .EmailAddress();

    RuleFor(x => x.Password)
      .NotEmpty()
      .MinimumLength(MinimumPasswordLength)
      .Must(ContainsUppercase).WithMessage("Password must contain at least one uppercase letter.")
      .Must(ContainsLowercase).WithMessage("Password must contain at least one lowercase letter.")
      .Must(ContainsDigit).WithMessage("Password must contain at least one digit.")
      .Must(ContainsSpecialCharacter).WithMessage("Password must contain at least one non-alphanumeric character.");

    RuleFor(x => x.FullName)
      .MaximumLength(256)
      .When(x => x.FullName is not null);
  }

  private static bool ContainsUppercase(string password) => password.Any(char.IsUpper);
  private static bool ContainsLowercase(string password) => password.Any(char.IsLower);
  private static bool ContainsDigit(string password) => password.Any(char.IsDigit);
  private static bool ContainsSpecialCharacter(string password) => SpecialCharacterRegex.IsMatch(password);
}
