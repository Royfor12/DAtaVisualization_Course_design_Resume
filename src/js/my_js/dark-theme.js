$(document).ready(function() {
  var lightTheme = 'path/to/bootstrap.min.css';
  var darkTheme = 'path/to/dark-theme.css';

  function toggleTheme(theme) {
    $('#theme-style').attr('href', theme);
  }

  // 初始加载时可能需要加载深色主题
  toggleTheme(darkTheme);

  // 假设你有一个切换按钮
  $('.theme-toggle').on('click', function() {
    toggleTheme($(this).data('theme') === 'light' ? lightTheme : darkTheme);
    $(this).data('theme', $(this).data('theme') === 'light' ? 'dark' : 'light');
  });
});