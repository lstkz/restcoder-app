const paths = [
  '../theme/common.scss',

  '../components/HeaderMessage/HeaderMessage.scss',
  '../components/Callout/Callout.scss',
  '../components/ChallengeFilter/ChallengeFilter.scss',
  '../components/ChallengeHelp/ChallengeHelp.scss',
  '../components/ChallengeList/ChallengeList.scss',
  '../components/ErrorMessage/ErrorMessage.scss',
  '../components/Examples/Examples.scss',
  '../components/Footer/Footer.scss',
  '../components/FormControl/FormControl.scss',
  '../components/Header/Header.scss',
  '../components/RecentSubmissions/RecentSubmissions.scss',
  '../components/ResponseCode/ResponseCode.scss',
  '../components/SwaggerExplorer/SwaggerExplorer.scss',
  '../components/SwaggerExplorer/JSONSchema.scss',
  '../components/FatalError/FatalError.scss',
  '../components/Ranking/Ranking.scss',
  '../components/Paginate/Paginate.scss',
  '../components/UserPhoto/UserPhoto.scss',
  '../components/PageTitle/PageTitle.scss',

  '../components/Profile/Info/Info.scss',
  '../components/Profile/Stats/Stats.scss',
  '../components/Profile/SubmissionHistory/SubmissionHistory.scss',
  '../components/Profile/HeaderInfo/HeaderInfo.scss',

  '../components/Forum/CategoryItem/CategoryItem.scss',
  '../components/Forum/StatsNumber/StatsNumber.scss',
  '../components/Forum/Teaser/Teaser.scss',
  '../components/Forum/UserIcon/UserIcon.scss',
  '../components/Forum/Permalink/Permalink.scss',
  '../components/Forum/TopicItem/TopicItem.scss',
  '../components/Forum/Post/Post.scss',
  '../components/Forum/Composer/Composer.scss',
  '../components/Forum/Paginate/Paginate.scss',
//  '../components/Top5/Top5.scss',
  '../containers/ChallengeDetails/ChallengeDetails.scss',
  '../containers/Home/Home.scss',
  '../containers/Landing/Landing.scss',
  '../containers/NewLanding/NewLanding.scss',
  '../containers/Login/Login.scss',
  '../containers/Register/Register.scss',
  '../containers/Ranking/Ranking.scss',
  '../containers/Forum/Forum.scss',
  '../containers/ForumTopic/ForumTopic.scss',
  '../containers/Tutorial/Tutorial.scss',

  '../components/Auth/LoginForm/LoginForm.scss',
  '../components/Auth/SocialAuth/SocialAuth.scss',
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
