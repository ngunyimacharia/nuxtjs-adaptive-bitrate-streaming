<template>
  <div class="w-2/3 mx-auto">
    <div v-show="selectedVideo">
      <video
        id="doc-player"
        controls
        muted
        class="cld-video-player cld-fluid"
      ></video>
    </div>

    <div class="rounded-md bg-green-50 p-4" v-if="uploading">
      <div class="flex">
        <div class="flex-shrink-0">
          <!-- Heroicon name: solid/check-circle -->
          <svg
            class="h-5 w-5 text-green-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-green-800">Upload in progress</h3>
          <div class="mt-2 text-sm text-green-700">
            <p>
              The file upload and processing is in progress. It will appear once
              upload is complete.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white mt-20">
      <div class="max-w-2xl lg:max-w-7xl">
        <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">
          Adaptive streaming ready videos
        </h2>

        <p>Click on a video to start viewing</p>

        <div
          class="
            mt-6
            grid grid-cols-1
            gap-y-10 gap-x-6
            sm:grid-cols-2
            lg:grid-cols-3
            xl:gap-x-8
          "
        >
          <div
            v-for="video in videos.resources"
            :key="video.asset_id"
            class="group relative"
          >
            <div
              class="
                w-full
                min-h-80
                bg-gray-200
                aspect-w-1 aspect-h-1
                rounded-md
                overflow-hidden
                group-hover:opacity-75
                lg:h-80 lg:aspect-none
              "
            >
              <cld-video
                :public-id="video.public_id"
                class="
                  w-full
                  h-full
                  object-center object-cover
                  lg:w-full lg:h-full
                "
                :alt="video.public_id"
              />
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-gray-700">
                  {{ video.public_id }}
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  {{ video.duration }} seconds
                </p>
              </div>
              <p class="text-sm font-medium text-gray-900">
                {{ video.format }}
              </p>
            </div>
            <button
              @click="selectedVideo = video"
              type="button"
              class="
                text-center
                w-full
                my-3
                px-3
                py-2
                border border-transparent
                text-sm
                leading-4
                font-medium
                rounded-md
                text-indigo-700
                bg-indigo-100
                hover:bg-indigo-200
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-indigo-500
              "
            >
              Watch
            </button>
          </div>
        </div>
      </div>
    </div>

    <form
      action="/api/upload"
      method="POST"
      enctype="multipart/form-data"
      class="w-1/2 mx-auto my-10"
    >
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div>
            <h3 class="text-xl font-medium tracking-tight text-gray-700">
              Upload new file
            </h3>
            <label
              for="about"
              class="py-3 block text-sm font-medium text-gray-700"
            >
              Video
            </label>
            <div class="my-3">
              <input
                accept="video/*"
                class="
                  shadow-sm
                  focus:ring-indigo-500 focus:border-indigo-500
                  mt-1
                  block
                  w-full
                  sm:text-sm
                  border border-gray-300
                  rounded-md
                "
                type="file"
                name="file"
              />
            </div>
            <p class="my-3 text-sm text-gray-500">
              Select the video you want uploaded for steaming
            </p>
          </div>
        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            class="
              inline-flex
              justify-center
              py-2
              px-4
              border border-transparent
              shadow-sm
              text-sm
              font-medium
              rounded-md
              text-white
              bg-indigo-600
              hover:bg-indigo-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
            "
          >
            Upload
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedVideo: null,
      demoplayer: null,
      uploading: this.$route.query.uploading,
    };
  },
  async asyncData() {
    const url = process.env.NUXT_ENV_APP_URL + "/api/resources";
    const videos = await fetch(url).then((res) => res.json());
    return { videos };
  },
  mounted() {
    if (this.uploading) {
      setTimeout(() => (this.uploading = false), 2000);
    }
    const cld = cloudinary.Cloudinary.new({ cloud_name: "hackit-africa" });
    this.demoplayer = cld.videoPlayer("doc-player").width(600);
  },
  watch: {
    selectedVideo() {
      console.log(this.selectedVideo);
      this.demoplayer.source(this.selectedVideo.public_id);
    },
  },
};
</script>
