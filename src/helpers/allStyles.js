const paths = [
  '../theme/common.scss',

  '../components/ActivationLinkInfo/ActivationLinkInfo.scss',
  '../components/Callout/Callout.scss',
  '../components/ChallengeFilter/ChallengeFilter.scss',
  '../components/ChallengeHelp/ChallengeHelp.scss',
  '../components/ChallengeList/ChallengeList.scss',
  '../components/ErrorMessage/ErrorMessage.scss',
  '../components/Examples/Examples.scss',
  '../components/Footer/Footer.scss',
  '../components/FormControl/FormControl.scss',
  '../components/Header/Header.scss',
  '../components/LoginForm/LoginForm.scss',
  '../components/RecentSubmissions/RecentSubmissions.scss',
  '../components/RegisterForm/RegisterForm.scss',
  '../components/ResponseCode/ResponseCode.scss',
  '../components/SwaggerExplorer/SwaggerExplorer.scss',
  '../components/SwaggerExplorer/JSONSchema.scss',
  '../components/FatalError/FatalError.scss',
  '../components/Ranking/Ranking.scss',
  '../components/Paginate/Paginate.scss',
  '../components/ProfileStats/ProfileStats.scss',
  '../components/ProfileInfo/ProfileInfo.scss',
  '../components/Forum/CategoryItem/CategoryItem.scss',
  '../components/Forum/StatsNumber/StatsNumber.scss',
  '../components/Forum/Teaser/Teaser.scss',
  '../components/Forum/UserIcon/UserIcon.scss',
  '../components/Forum/Permalink/Permalink.scss',
  '../components/Forum/TopicItem/TopicItem.scss',
  '../components/Forum/Post/Post.scss',
//  '../components/Top5/Top5.scss',
  '../containers/ChallengeDetails/ChallengeDetails.scss',
  '../containers/Home/Home.scss',
  '../containers/Landing/Landing.scss',
  '../containers/Login/Login.scss',
  '../containers/Register/Register.scss',
  '../containers/Ranking/Ranking.scss',
  '../containers/Forum/Forum.scss',
  '../containers/ForumTopic/ForumTopic.scss',
];

// this will fix blinking of unstyled content in initial page load
// only for development
// fast update:
// find src/components -name "*.scss"
// find src/containers  -name "*.scss"

export default function allStyles() {
  return paths.map((path) => {
    const result = require(path);
    if (!result) {
      console.error('allStyles() can\'t load ', path);
      return null;
    }
    return result._style;
  }).filter((item) => item).join('\n');
}
