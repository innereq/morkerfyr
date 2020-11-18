<script context="module">
    // import the logic for finding a post based on slug
    import { findPost } from '../../posts';
  
    // sapper calls this to load our data
    export function preload(page) {
      // find the post based on the slug param
      const post = findPost(page.params.slug);
  
      // return a list of props
      return { post };
    }
</script>
  
<script>
  // this prop is filled from the result of the `preload()`
  export let post;
</script>
  
<!-- display the post -->
<div class="flex flex-col justify-center items-center">
  <article class="prose">
    <h1>{post.title}</h1>
    <h3>Опубликовано {post.date} за авторством {post.author}</h3>
    {@html post.html}
  </article>
</div>