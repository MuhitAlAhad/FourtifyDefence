using System.Globalization;
using DefenceCrm.Api.Contracts.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DefenceCrm.Api.Controllers;

[ApiController]
[Route("api/abn")]
public class AbnController(ILogger<AbnController> logger) : ControllerBase
{
  private static readonly int[] Weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

  [AllowAnonymous]
  [HttpGet("{abn}")]
  [ProducesResponseType(typeof(AbnLookupResponse), StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  public IActionResult LookupAbn(string abn)
  {
    var cleaned = new string(abn.Where(char.IsDigit).ToArray());
    if (cleaned.Length != 11 || !IsValidAbn(cleaned))
    {
      return BadRequest(new { message = "Invalid ABN. Please enter a valid 11-digit ABN." });
    }

    // Mocked lookup for now; replace with external ABN service when available.
    var entityName = $"Defence Solutions Pty Ltd ({cleaned[^3..]})";
    var response = new AbnLookupResponse
    {
      Abn = cleaned,
      EntityName = entityName,
      Status = "Active"
    };

    logger.LogInformation("ABN lookup served for {Abn}", cleaned);
    return Ok(response);
  }

  private static bool IsValidAbn(string digits)
  {
    if (digits.Length != 11 || digits.Any(c => !char.IsDigit(c)) || digits[0] == '0')
    {
      return false;
    }

    if (IsCommonFakeAbn(digits))
    {
      return false;
    }

    // Subtract 1 from the first digit, multiply by weights, and ensure divisible by 89.
    var numbers = digits.Select(c => int.Parse(c.ToString(), CultureInfo.InvariantCulture)).ToArray();
    numbers[0] -= 1;

    var sum = 0;
    for (var i = 0; i < Weights.Length; i++)
    {
      sum += numbers[i] * Weights[i];
    }

    return sum % 89 == 0;
  }

  private static bool IsCommonFakeAbn(string digits)
  {
    if (digits.All(c => c == digits[0]))
    {
      return true;
    }

    return digits is "12345678901" or "01234567890";
  }
}
