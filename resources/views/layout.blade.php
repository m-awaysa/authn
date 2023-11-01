<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full bg-gray-50">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel Passkey Authentication Demo | Joe Codes</title>

    <link href="https://fonts.bunny.net/css2?family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">

    <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml">

    <meta property="og:image" content="{{ url('/social-demo-site.png') }}" />
    <meta property="og:image:width" content="1146" />
    <meta property="og:image:height" content="600" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ url('/') }}" />
    <meta property="og:title" content="Laravel Passkey Authentication Demo | Joe Codes" />
    <meta property="og:description"
        content="This is a demo of how to authenticate users in your Laravel app using a passkey." />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@joetannenbaum" />
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

    @if (config('services.fathom_analytics.id'))
    <script src="https://cdn.usefathom.com/script.js" data-site="{{ config('services.fathom_analytics.id') }}" defer>
    </script>
    @endif

    @if (app()->environment('production'))
    <script src="//d2wy8f7a9ursnm.cloudfront.net/v7/bugsnag.min.js">
    </script>
    <script>
        Bugsnag.start({ apiKey: '6475c3116770ff30bc453a10b81f486f' })
    </script>
    @endif
</head>

<body class="h-full">
    <div class="relative flex flex-col justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">


        @yield('content')

      
    </div>
</body>

</html>