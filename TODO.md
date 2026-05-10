# TODO

- [x] Fix production API base URL handling (use relative URL by default)

- [ ] Remove relaxed CSP (currently `contentSecurityPolicy: false`) or set strict CSP in `server/server.js`
- [ ] Harden auth: move from `localStorage` token to cookie-based JWT (requires coordinated changes in server + client)
- [ ] Provide instructions for rotating secrets already in hosting env vars and forcing password reset
- [ ] Build + test locally (client build + server start)
- [ ] Update deployment notes for permanent hosting (Render/Vercel)

