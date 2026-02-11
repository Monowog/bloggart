import { form, query, getRequestEvent } from "$app/server";
import { error, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/auth"; 
import { post } from '$lib/server/db/schema';
import { db } from "$lib/server/db";
import { eq } from 'drizzle-orm';
import * as v from 'valibot';

// Can do database stuff here

export const getAllPosts = query(async () => db.query.post.findMany());
export const getPostById = query(v.string(), async (id) => 
  db.query.post.findFirst({
    where: (p, {eq}) => eq(p.id, id)
  })
);

export const create_post = form(v.object({
  title: v.pipe(v.string(), v.nonEmpty('Title is required')),
  body: v.pipe(v.string(), v.nonEmpty())
}), async ({title, body}) => {
  const event = getRequestEvent();
  const session = await auth.api.getSession({
    headers: event.request.headers
  })

  if (!session?.user?.id){
    error(401, 'Unauthorized');
  }

  const slug = title.toLowerCase().replace(/ /g, '-');

  await db.insert(post).values({
    title,
    slug,
    body,
    authorId: session.user.id
  });

  redirect(303, '/admin');
});

export const update_post = form(v.object({
  title: v.pipe(v.string(), v.nonEmpty('Title is required')),
  body: v.pipe(v.string(), v.nonEmpty()),
  id: v.pipe(v.string(), v.nonEmpty())
}), async ({title, body, id}) => {
  const event = getRequestEvent();
  const session = await auth.api.getSession({
    headers: event.request.headers
  })

  if (!session?.user?.id){
    error(401, 'Unauthorized');
  }

  const slug = title.toLowerCase().replace(/ /g, '-');

  await db.update(post).set({
    title,
    slug,
    body
  }).where(eq(post.id, id));

  redirect(303, '/admin');
});