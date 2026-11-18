# ZR Instructional Design Portfolio — Netlify + Pages CMS

A custom-code portfolio starter based on the **minimalist second homepage concept** (portrait, hero statement, three featured case studies, key strengths). It has editable content files and a free content-editor setup.

## What you get

- Nine generated HTML pages: Home, About, Portfolio, My Approach, Résumé, Contact, and three project case studies.
- Clean responsive CSS and mobile menu; no JavaScript framework or paid package dependencies.
- All editable content in `content/*.json` and `content/projects/*.json`.
- `.pages.yml` to edit those content files through the free Pages CMS app.
- `build.mjs` generates a fast static website in `dist/`.
- `netlify.toml` configures Netlify builds and publication.

**This is a starter, not an already-published website.** The portrait is a generated demo image; project images are illustrative samples. Case study statements are examples or prompts, not verified employment accomplishments. Replace placeholders and check accuracy before sharing publicly. No résumé, professional email, or LinkedIn URL has been supplied, so those are blank.

## Fastest preview (no coding; no Pages CMS yet)

1. Extract `ZR_Netlify_Quick_Deploy.zip` (or upload the zip directly).
2. Open **https://app.netlify.com/drop** and upload it. You will receive a `*.netlify.app` site URL. Netlify Drop makes the files available online — keep the link private until placeholders are replaced.
3. The quick-deploy zip is a *built site*. Editing the content later requires re-deploying the built files, so use the GitHub workflow below for ongoing editing.

## Recommended full setup for easy future editing

1. Create free accounts at **https://github.com**, **https://app.netlify.com**, and **https://app.pagescms.org**.
2. On GitHub, create a repository such as `instructional-design-portfolio`. Create it **without** adding a README/license/gitignore, since these files come in this source package.
3. Extract `ZR_Netlify_Editable_Source.zip` and upload **the files within the extracted folder**, including `.pages.yml`, `build.mjs`, `netlify.toml`, `assets/`, and `content/`, to the repository root. Avoid uploading the ZIP itself as a single file. Make sure `.pages.yml` is included (it is a hidden file on some computers). If you use Git on your computer, `git add .` and push is also fine.
4. In Netlify: **Add new project → Import an existing project → GitHub**, choose the repository. The supplied `netlify.toml` sets the build command to `node build.mjs` and the publish directory to `dist`.
5. Deploy. Netlify will build the site automatically. When your GitHub repository changes, Netlify rebuilds and republishes it.
6. Go to **https://app.pagescms.org**, sign in using GitHub, and grant the Pages CMS GitHub App access to this repository. Open the repository in Pages CMS. The `.pages.yml` file gives you editors for Site Settings, Homepage, About, My Approach, Contact, Résumé, and Portfolio Case Studies.
7. Edit a field and save. Pages CMS commits it to GitHub; Netlify detects the change and publishes the update after a build.

**Visual-editing limitation:** Pages CMS provides a friendly field-based/rich-text-style editing interface. It is not a drag-and-drop canvas for repositioning page sections. The page layout is controlled through `assets/styles.css` and `build.mjs`.

## Where to make common changes

| To change | Use Pages CMS section |
| --- | --- |
| Name or header branding | Site Settings |
| Headline, opening text, portrait | Homepage |
| Featured projects | Portfolio Case Studies → mark featured |
| Project thumbnails and individual case study content | Portfolio Case Studies |
| Key Strengths labels | Homepage |
| Pearson background and About text | About Page |
| ADDIE, Agile, process steps, tools | My Approach Page |
| Email, LinkedIn, résumé link | Site Settings |

**Résumé upload:** Upload a PDF through the Pages CMS media manager. Copy its public path (usually `/assets/uploads/file-name.pdf`) into Site Settings → Résumé file URL. The Résumé page will then display the link. The URL field may also be set to a trusted HTTPS link.

**New project:** Create a JSON entry in Portfolio Case Studies, with a URL slug in lowercase letters, numbers, and hyphens. Keep the JSON `slug` in sync with the filename. The build adds the project page and includes it on the portfolio index. Only the first three marked `featured` show on the homepage.

**Images:** An authentic headshot is preferable to any AI demo portrait. For Pearson and other employers, share only projects/assets you have permission to display, and do not disclose proprietary training content, personal data, or confidential metrics.

## Developer instructions

- Install Node.js 20 or later.
- Run `node build.mjs` from the repository root.
- The deployable static site is generated in `dist/`.
- Optional local preview: serve `dist/` with an HTTP static server (not `file://`, because site links use root paths), for example `npx serve dist`.
- No build dependencies or paid services are required for the provided code.

## Costs

Netlify Free currently offers 300 usage credits each month with a hard limit. If the limit is exceeded, the site may be paused until the next cycle. Pages CMS is free. A custom `.com` domain, if you buy one, costs extra; the included `*.netlify.app` URL costs nothing.

## Migrating from WordPress

You do **not** have to delete your current `zrosado.school.blog` site. Keep it running until the new website is finalized. WordPress content and media do not automatically transfer into this site; copy approved work selectively and rewrite it as case studies. The `school.blog` subdomain itself cannot be moved as your Netlify domain; use a new Netlify subdomain or purchase your own domain.
