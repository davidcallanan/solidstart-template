import type { APIEvent } from "@solidjs/start/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { router } from "~/server/api/root";

const handler = (event: APIEvent) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req: event.request,
    router,
    createContext: () => event
  });

export const GET = handler;
export const POST = handler;
