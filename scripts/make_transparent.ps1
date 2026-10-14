Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\ewand\.gemini\antigravity\brain\3c0cf090-8152-4def-83f3-d2f0095824ac\eucalyptus_branch_1791876900031.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$rect = [System.Drawing.Rectangle]::new(0, 0, $bmp.Width, $bmp.Height)
$outBmp = [System.Drawing.Bitmap]::new($bmp.Width, $bmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Lock bits for high-speed direct memory manipulation
$bmpDataIn = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$bmpDataOut = $outBmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$bytes = [Math]::Abs($bmpDataIn.Stride) * $bmp.Height
$rgbValues = [byte[]]::new($bytes)
[System.Runtime.InteropServices.Marshal]::Copy($bmpDataIn.Scan0, $rgbValues, 0, $bytes)

# Process BGRA (every 4 bytes: B, G, R, A)
for ($i = 0; $i -lt $bytes; $i += 4) {
    $b = [double]$rgbValues[$i]
    $g = [double]$rgbValues[$i + 1]
    $r = [double]$rgbValues[$i + 2]

    # Calculate brightness and whiteness
    $minVal = [Math]::Min($r, [Math]::Min($g, $b))
    $avg = ($r + $g + $b) / 3.0

    # Whiteness index: pixels that are bright and desaturated (white background)
    if ($minVal -ge 228 -or $avg -ge 232) {
        # Fully transparent
        $rgbValues[$i + 3] = 0
    } elseif ($minVal -ge 195 -and $avg -ge 205) {
        # Transition / edge: calculate alpha and de-matte white
        $alphaRatio = (228.0 - $minVal) / (228.0 - 195.0)
        if ($alphaRatio -lt 0.0) { $alphaRatio = 0.0 }
        if ($alphaRatio -gt 1.0) { $alphaRatio = 1.0 }

        $alpha = [int]($alphaRatio * 255.0)
        
        # Remove white matte component to avoid halo
        $bClean = [Math]::Max(0.0, [Math]::Min(255.0, ($b - 255.0 * (1.0 - $alphaRatio)) / [Math]::Max(0.01, $alphaRatio)))
        $gClean = [Math]::Max(0.0, [Math]::Min(255.0, ($g - 255.0 * (1.0 - $alphaRatio)) / [Math]::Max(0.01, $alphaRatio)))
        $rClean = [Math]::Max(0.0, [Math]::Min(255.0, ($r - 255.0 * (1.0 - $alphaRatio)) / [Math]::Max(0.01, $alphaRatio)))

        $rgbValues[$i]     = [byte][int]$bClean
        $rgbValues[$i + 1] = [byte][int]$gClean
        $rgbValues[$i + 2] = [byte][int]$rClean
        $rgbValues[$i + 3] = [byte]$alpha
    } else {
        # Fully opaque leaf
        $rgbValues[$i + 3] = 255
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($rgbValues, 0, $bmpDataOut.Scan0, $bytes)
$bmp.UnlockBits($bmpDataIn)
$outBmp.UnlockBits($bmpDataOut)

$outBmp.Save("c:\Project\porto2\public\images\eucalyptus_left.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Create mirrored version for right
$outBmp.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipX)
$outBmp.Save("c:\Project\porto2\public\images\eucalyptus_right.png", [System.Drawing.Imaging.ImageFormat]::Png)

$bmp.Dispose()
$outBmp.Dispose()
Write-Host "De-matted eucalyptus successfully"
