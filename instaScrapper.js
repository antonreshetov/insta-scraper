/**
 * author: Anton Reshetov
 * url: https://github.com/antonreshetov
 * @param {string} username - instagram username
 * @param {string} thumbnails - thumbnails (thumbnail_src, display_src)
 * @returns {Promise} - array of images
 */
function instaScraper(username, thumbnails = 'display_src') {
  if (!username) throw new Error('Username is required')

  const instaURL = `http://instagram.com/${username}`
  const instaPageLink = 'http://instagram.com/p/'
  const thumb = thumbnails

  return new Promise((resolve, reject) => {
    fetch(
      `http://allorigins.me/get?url=${encodeURIComponent(instaURL)}&callback=?`
    )
      .then(res => res.text())
      .then(data => {
        data = JSON.parse(
          data
            .split('window._sharedData = ')[1]
            .split(';</script>')[0]
            .replace(/\\"/g, '"')
        )

        if (Object.keys(data.entry_data).length !== 0) {
          resolve(
            data.entry_data.ProfilePage[0].graphql.user
              .edge_owner_to_timeline_media.edges
          )
        } else {
          reject('User name is invalid or account is empty')
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
