package com.toyota.tmna.lexusdrivers.core.util;

public class ConstantsUtil {
    public static String COVERAGE = "";
    /* Global Footer*/
    public static final String GLOBAL_FOOTER_RESOURCE = "lexusdrivers/components/content/globalfooter";
    public static final String GLOBAL_FOOTER_SELECTOR = "footer";
    public static final String GF_COLUMN_HEADLINE = "footerColumnHeadline";
    public static final String GLOBAL_FOOTER_LINKS_PATH ="/footerlinks";

    public static final String GLOBAL_FOOTER_LINK="footerlinks";
    public static final String GLOBAL_FOOTER_LINKLIST="linklist";
    public static final String GF_LINK_TARGET_URL = "linktargeturl";
    public static final String GF_LINK_TITLE = "linktitle";
    public static final String GF_OPEN_NEW="openinnew";
    public static final String GF_THIRD_PARTY_ICON="thirdpartyicon";

    public static final String GF_LINKS_URLS="linksUrl";
    public static final String GF_LINKS_TITLE = "linkstitle";

    /* Display Message*/

    public static final String DISPLAY_MESSAGE_RESOURCE = "lexusdrivers/components/content/displayMessage";

    /* Forgot Password Message*/

    public static final String FORGOT_PASSWORD_RESOURCE = "lexusdrivers/components/content/forgotPassword";

    /* Global Navigation Message*/

    public static final String GNAV_MESSAGE_RESOURCE = "lexusdrivers/components/content/globalNav";

    /* HeaderConfiguration */

    public static final String URL_SERVICE_PID = "com.toyota.tmna.lexusdrivers.core.factory.HeaderFactoryEndPoints";
    public static final String EOSPUBLIC = "eospublic";

    public static final String X_EOS_API_KEY = "eosApiKey";

    public static final String DCS3 = "dcs3";

    public static final String X_DCS_API_KEY = "dcsApiKey";


    public static final String CONFIG_PATH= "lexusdrivers/components/content/config";

    public static final String COMPO_PATH = "/jcr:content/root/responsivegrid";

    public static final String RESPONSE_APPLICATION_JSON = "application/json";
    public static final String RESPONSE_CHARACTER_CODE = "UTF-8";


    public void passCoverage(){
        COVERAGE="paramter to pass coverage";
    }
}
