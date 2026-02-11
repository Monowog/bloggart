<script lang="ts">
  import { resolve } from '$app/paths';
  import { goto } from '$app/navigation';
  import { authClient } from '$lib/auth-client';

  let error = $state('');

  async function signup(e: Event){
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const password_confirm = form.passwordConfirm.value;

    if (password !== password_confirm) {
      error = "Passwords don't match";
      return;
    }

    await authClient.signUp.email({
      email,
      password,
      name: username
    }, {
      onSuccess: async () => {
        goto(resolve('/'));
      }
    }
    );
  }
</script>

<div class="box-1">
  <h1>Sign Up</h1>
  <form onsubmit={signup}>
    <div class="row">
      <label>
        Username:
        <input required type="text" id="username">
      </label>
    </div>
    <div class="row">
      <label>
        Email:
        <input required type="email" id="email">
      </label>
    </div>
    <div class="row">
      <label>
        Password:
        <input required type="password" id="password">
      </label>
    </div>
    <div class="row">
      <label>
        Confirm Password:
        <input required type="password" id="passwordConfirm">
      </label>
    </div>
    {#if error}
      <p style:color="var(--red)">{error}</p>
    {/if}
    <button type="submit">Sign Up</button>
  </form>
</div>