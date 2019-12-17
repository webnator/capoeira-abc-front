<template>
  <v-app>
    <v-app-bar app color="primary" flat tile dark>
      <v-avatar class="logo-container elevation-6 py-2">
        <v-img
          src="../assets/logo-blanco.png"
          class=""
          contain>
        </v-img>
      </v-avatar>

      <v-spacer></v-spacer>

      <SongSearch v-show="false"
        @search-terms="findByTerms($event)"
      ></SongSearch>

      <v-spacer></v-spacer>
      <SideMenu></SideMenu>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-row>
          <div class="divider">
            <span class="horizontal">
              <span></span>
              <span></span>
            </span>
            <span class="vertical">
              <span class="vertical-child"></span>
              <span class="vertical-child"></span>
              <span class="horizontal">
                <span></span>
                <span></span>
              </span>
            </span>
            
          </div>
        </v-row>
        <v-row 
          class="mb-6"
          justify="center"
          no-gutters>
          <v-col lg="6">
            <div>
              <div class="title font-weight-black">
                <span v-t="'about'"></span>
              </div>
            </div>

            <div class="content">
              <span v-html="$t('about_page.paragraphs[0]')"/>
              <br/><br/>
              <span v-html="$t('about_page.paragraphs[1]')"/>
              <br/><br/>
              <span v-html="$t('about_page.paragraphs[2]')"/>
              <br/><br/>
              <span v-html="$t('about_page.paragraphs[3]')"/>
              <br/><br/>
              <span v-html="$t('about_page.paragraphs[4]')"/>
              <br/><br/>
              <span v-html="$t('about_page.paragraphs[5]')"/>
              <br/><br/>
              <ul>
                <li>{{ $t('about_page.help_list[0]') }} <router-link to="/contact" v-t="'about_page.contact_call'"/></li>
                <li>{{ $t('about_page.help_list[1]') }} <router-link to="/contact" v-t="'about_page.contact_call'"/></li>
                <li>{{ $t('about_page.help_list[2]') }} <router-link to="/contact" v-t="'about_page.contact_call'"/></li>
                <li>{{ $t('about_page.help_list[3]') }} <router-link to="/contact" v-t="'about_page.contact_call'"/></li>
                <li>{{ $t('about_page.help_list[4]') }} <router-link to="/contact" v-t="'about_page.contact_call'"/></li>
                <li>{{ $t('about_page.help_list[5]') }} <router-link to="/contact" v-t="'about_page.contact_call'"/></li>
              </ul>

              <br/><br/>
              <hr>
              <span v-html="$t('about_page.tech_info')"/>
              <hr>
              <br/><br/>

              <span v-html="$t('about_page.final_message')"/>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    
  </v-app>
</template>

<script>
import SongSearch from '@/components/SongSearch'
import SideMenu from '@/components/SideMenu'

export default {
  name: 'about',
  components: {
    SongSearch,
    SideMenu
  },
  data() {
    return { }
  }
}
</script>

<style lang="scss">
.logo-container {
  background-color: var(--v-secondary-base);
  height: 84px !important;
  min-width: 48px;
  width: 12% !important;
  max-width: 150px !important;
  margin-top: 20px;
  margin-left: 2%;
  border-radius: 0px 0px 10px 10px;
}

.content {
  text-align: left;

  a {
    color: var(--v-accent-base) !important;
    font-weight: bold;
    &:hover {
      color: var(--v-secondary-base) !important;
      background-color: var(--v-accent-base);
    }
  }
}

.divider {
  width: 100%;
  margin: 20px 0;
  span {
    display: block;
  }
  .horizontal {
    span {
      background-image: url('../assets/corda.png');
      width: 100%;
      height: 6px;
      margin-top: 2px;
      background-repeat: repeat-x;
      background-size: 100px 6px;
      &:first-of-type {
        background-position: 13px;
      }
    }
  }
  .vertical {
    position: absolute;
    right: 15px;
    height: 50vh;
    background-color: var(--v-primary-base);
    margin-top: -18px;
    span.vertical-child {
      background-image: url('../assets/corda.png');
      background-repeat: repeat-y;
      background-size: 14px 16px;
      width: 6px;
      height: inherit;
      right: 10px;
      margin-right: 3px;
      display: inline-block;
      margin-left: 1.5px;
      margin-right: 1.5px;
      &::after {
        content: "";
        background-image: url('../assets/corda-final.png');
        height: 40px;
        width: 17px;
        display: block;
        position: absolute;
        bottom: -38px;
        background-size: 57%;
        background-repeat: no-repeat;
        margin-left: -2px;
      }

    }
    .horizontal {
      position: absolute;
      top: 14px;
      width: 23px;
      margin-left: -3px;
      background-color: var(--v-primary-base);
    }
    
  }
}

</style>
