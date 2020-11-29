@extends('layouts.app')

@section('content')

<div class="container-center">
<h2 class="messaggi">Messaggi</h2>

<ul class="commentlist" id="commentlist">
  @foreach ($messages as $message)
        <li class="comment even thread-even depth-1 buried" id="li-comment-466098">
    <div class="comment-wrap" id="comment-466098">
        <div class="author-avatar">
        <img src="{{asset('storage/' .$message->apartment->images[0]['path'] )}}" loading="lazy" class="lazyload-gravatar" alt="Apartment " style="" width="130" height="130">
        </div>
    <div class="comment-body">
        <div class="comment-author-wrap vcard">
            
            <div class="comment-author">{{$message->name. " " . $message->lastname }}</div> 
            <span class="comment-time">
            <i class="fas fa-envelope"></i> {{$message->email}}
            </span>
            <div class="comment-time">
            <i class="fas fa-clock"></i> {{$message->created_at}}
            </div>
           
        </div>
        <div class="comment-content article-content">
          <i class="fas fa-envelope-open"></i> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, temporibus numquam. In aspernatur tempora labore molestiae modi neque quae ab facere hic? Vitae ab recusandae placeat eveniet quisquam accusantium consequuntur!</p>
        </div>
    </div>
    <div class="comment-actions">
        <div class="delete">
           <i class="fas fa-trash-alt"></i>
           <i class="fas fa-bookmark"></i>
        </div>
    </div>
    </div>
</li>
  @endforeach
</ul>

</div>
@endsection
