<script lang="ts">
  import { page } from '$app/state';
  import { getPostById, update_post } from '../../posts.remote';

  const post = await getPostById(page.params.id!);
  console.log(post);
</script>

<form { ...update_post }>
  <input {...update_post.fields.id.as('text')} readonly value={post?.id} />

  <div class="row">
    <label>
      Title: 
      <br />
      <input {...update_post.fields.title.as('text')} value={post?.title} />
    </label>
    {#each update_post.fields.title.issues() as issue (issue.message)}
      <p>{issue.message}</p>
    {/each}
  </div>

  <div class="row">
    <label>Body: 
    <br />
      <textarea {...update_post.fields.body.as('text')} value={post?.body}></textarea>
    </label>
  </div>
  <button type="submit">Post</button>
</form>