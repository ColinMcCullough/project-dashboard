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

```
gcloud beta container --project "operational-excellence-239518" node-pools create "non-whitelisted-apps" --cluster "opex-staging" --zone "us-west1-a" --node-version "1.18.9-gke.801" --machine-type "n1-standard-2" --image-type "COS" --disk-type "pd-standard" --disk-size "100" --metadata disable-legacy-endpoints=true --scopes "https://www.googleapis.com/auth/devstorage.read_only","https://www.googleapis.com/auth/logging.write","https://www.googleapis.com/auth/monitoring","https://www.googleapis.com/auth/servicecontrol","https://www.googleapis.com/auth/service.management.readonly","https://www.googleapis.com/auth/trace.append" --num-nodes "2" --enable-autoscaling --min-nodes "1" --max-nodes "5" --enable-autoupgrade --enable-autorepair --max-surge-upgrade 1 --max-unavailable-upgrade 0
```


cloudinary folder name is `${clientName}/${locationId}`