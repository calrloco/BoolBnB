@extends('layouts.app')
@section('content')
<canvas id="chart">
    
</canvas>

<<<<<<< HEAD
<script src="{{ asset('js/stats.js')}}"></script>
@endsection
=======
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <title>Document</title>
</head>

<body>
    @foreach($images as $image) 
        <img src="{{ asset('storage/' . $image->path)}}" alt="">
    @endforeach

</body>

</html>
>>>>>>> _Yuri
