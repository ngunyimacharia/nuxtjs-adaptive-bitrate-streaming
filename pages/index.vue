<template>
  <div>
    <!-- <div style="max-width: px">
      <video
        id="doc-player"
        controls
        muted
        class="cld-video-player cld-fluid"
      ></video>
    </div> -->
    <form action="/api/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  </div>
</template>

<script>
export default {
  mounted() {
    // var cld = cloudinary.Cloudinary.new({ cloud_name: "hackit-africa" });
    // var demoplayer = cld.videoPlayer("doc-player").width(600);
    // demoplayer.source("fnhizdw90fv23kijjzpb.m3u8");
  },
};
</script>
