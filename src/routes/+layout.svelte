<script lang="ts">
  import '@drop-in/graffiti';
	import studyIcon from '$lib/assets/study.png';

	let { children, data } = $props();
</script>

<svelte:head>
  <title>Bloggart</title>
  <meta name="Bloggart">
	<link rel="icon" href={studyIcon} />
</svelte:head>

<main class="layout-readable-center">
  {@render children()}
</main>