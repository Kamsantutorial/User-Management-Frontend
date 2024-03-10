<template>
  <a-result status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
    <template #extra>
      <a :href="'/'"><a-button type="primary">Back Home</a-button></a>
    </template>
  </a-result>
</template>
