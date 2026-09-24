$email = "confirmtest_" + [DateTime]::UtcNow.ToString("yyyyMMddHHmmss") + "@example.com"
$body = @{
    name = "Confirm Test"
    email = $email
    phone = "9876543210"
    password = "TestPass123"
    confirmPassword = "WrongPass123"
} | ConvertTo-Json -Compress

Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/auth/register" -ContentType "application/json" -Body $body | ConvertTo-Json -Depth 20
