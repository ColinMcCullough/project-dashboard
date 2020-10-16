# Onboarding Project Dashboard

Description

## Setup

**For development**

```bash
git clone https://github.com/ColinMcCullough/project-dashboard.git
cd project-dashboard
npm i
cp .env.TEMPLATE .env
```

Fill out the `.env` file.

```bash
npm run dev
```

**For Production**

Set **BROWSER_URL** env in `Dockerfile` to public domain. __Ex. fakedomain.com__
Set **PORT** in `Dockerfile` and in `chart/nuxt/values.yaml`.
Set **tag:** to the release version in `chart/nuxt/values.yaml`. Release versions are unique revisions, so increment the current value if you aren't publishing a specific new version.

```bash
npm run docker:build
docker tag project-dashboard g5opex/project-dashboard:<tag>
docker push g5opex/project-dashboard:<tag>
npm run helm:upgrade
```

If the service hasn't been established in Kubernetes, this won't work.

