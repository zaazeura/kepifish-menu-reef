<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- All owner-editable catalog content (QR catalog URL, WhatsApp/contact config, the exactly-two menu items, About text) lives in `src/lib/data.ts` as the single source of truth; components read from it and never hardcode prices or contact details. — so the owner can update the catalog by editing one file.
- KEPIFISH site sections live as separate components under `src/components/kepifish/` and are composed in `src/routes/index.tsx` (single-page catalog with hash-anchor navigation). — keeps the one-page catalog structure predictable.
