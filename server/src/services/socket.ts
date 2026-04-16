import type { Server } from "socket.io";

let ioRef: Server | null = null;
const userSockets = new Map<string, Set<string>>();

export function attachSocket(io: Server) {
  ioRef = io;
  io.on("connection", (socket) => {
    socket.on("auth", ({ userId }: { userId: string }) => {
      const set = userSockets.get(userId) ?? new Set<string>();
      set.add(socket.id);
      userSockets.set(userId, set);
    });

    socket.on("disconnect", () => {
      for (const [userId, set] of userSockets.entries()) {
        if (set.has(socket.id)) {
          set.delete(socket.id);
          if (set.size === 0) userSockets.delete(userId);
        }
      }
    });
  });
}

export function emitToUser(userId: string, event: string, payload: unknown) {
  if (!ioRef) return;
  const sockets = userSockets.get(userId);
  if (!sockets) return;
  for (const sid of sockets) {
    ioRef.to(sid).emit(event, payload);
  }
}

