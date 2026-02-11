<script lang="ts">
  import { resolve } from '$app/paths';
  import { getAllPosts } from './posts.remote';
  //query all posts
  const posts = await getAllPosts();
</script>

<a class="button" href={resolve("/admin/post/new")}>New Post</a>

<ul>
  {#each posts as post}
    <li>
      <a href={resolve(`/admin/post/${post.id}`)}>{post.title}</a>
    </li>
  {/each}
</ul>

<!-- list all posts -->

