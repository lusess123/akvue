<template>
  <ul class="nav navbar-top-links navbar-right">
    <li class="dropdown">
        <span class="m-r-sm text-muted welcome-message">{{name}}</span>
    </li>
    <li class="dropdown">
        <a class="dropdown-toggle count-info" data-toggle="dropdown">
            <i class="fa fa-envelope"></i>  <span class="label label-warning">0</span>
        </a>
        <ul class="dropdown-menu dropdown-messages">
            <li>
                <div class="dropdown-messages-box">
                    <div class="media-body">
                        <small class="pull-right">46h ago</small>
                        <strong>Mike Loreipsum</strong> started following <strong>Monica Smith</strong>. <br>
                        <small class="text-muted">3 days ago at 7:58 pm - 10.06.2014</small>
                    </div>
                </div>
            </li>
            <li class="divider"></li>
            <li>
                <div class="dropdown-messages-box">
                    <div class="media-body ">
                        <small class="pull-right text-navy">5h ago</small>
                        <strong>Chris Johnatan Overtunk</strong> started following <strong>Monica Smith</strong>. <br>
                        <small class="text-muted">Yesterday 1:21 pm - 11.06.2014</small>
                    </div>
                </div>
            </li>
            <li class="divider"></li>
            <li>
                <div class="dropdown-messages-box">
                    <div class="media-body ">
                        <small class="pull-right">23h ago</small>
                        <strong>Monica Smith</strong> love <strong>Kim Smith</strong>. <br>
                        <small class="text-muted">2 days ago at 2:30 am - 11.06.2014</small>
                    </div>
                </div>
            </li>
            <li class="divider"></li>
            <li>
                <div class="text-center link-block">
                    <a href="mailbox.html">
                        <i class="fa fa-envelope"></i> <strong>Read All Messages</strong>
                    </a>
                </div>
            </li>
        </ul>
    </li>
    <li class="dropdown hide">
        <a class="dropdown-toggle count-info" data-toggle="dropdown">
            <i class="fa fa-bell"></i>  <span class="label label-primary">0</span>
        </a>
        <ul class="dropdown-menu dropdown-alerts">
            <li>
                <a href="mailbox.html">
                    <div>
                        <i class="fa fa-envelope fa-fw"></i> You have 16 messages
                        <span class="pull-right text-muted small">4 minutes ago</span>
                    </div>
                </a>
            </li>
            <li class="divider"></li>
            <li>
                <a href="profile.html">
                    <div>
                        <i class="fa fa-twitter fa-fw"></i> 3 New Followers
                        <span class="pull-right text-muted small">12 minutes ago</span>
                    </div>
                </a>
            </li>
            <li class="divider"></li>
            <li>
                <a href="grid_options.html">
                    <div>
                        <i class="fa fa-upload fa-fw"></i> Server Rebooted
                        <span class="pull-right text-muted small">4 minutes ago</span>
                    </div>
                </a>
            </li>
            <li class="divider"></li>
            <li>
                <div class="text-center link-block">
                    <a href="notifications.html">
                        <strong>See All Alerts</strong>
                        <i class="fa fa-angle-right"></i>
                    </a>
                </div>
            </li>
        </ul>
    </li>
    <li class="dropdown"></li>
  </ul>
</template>

<script>
export default {
  computed: {
    name () {
      return this.$store.getters.nav.header.name
    }
  },
  methods: {
    logout () {
      this.$router.push({name: 'logout'})
    }
  }
}
</script>
