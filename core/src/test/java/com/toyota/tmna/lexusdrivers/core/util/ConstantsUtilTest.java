package com.toyota.tmna.lexusdrivers.core.util;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ConstantsUtilTest {


 @Test
 void passCoverage() {
  assertNotNull(ConstantsUtil.COVERAGE);
  assertNotNull(ConstantsUtil.GLOBAL_FOOTER_RESOURCE);
  assertNotNull(ConstantsUtil.GLOBAL_FOOTER_SELECTOR);
  assertNotNull(ConstantsUtil.GF_COLUMN_HEADLINE);
  assertNotNull(ConstantsUtil.GLOBAL_FOOTER_LINKS_PATH);
  assertNotNull(ConstantsUtil.GLOBAL_FOOTER_LINK);
  assertNotNull(ConstantsUtil.GLOBAL_FOOTER_LINKLIST);
  assertNotNull(ConstantsUtil.GF_LINK_TARGET_URL);
  assertNotNull(ConstantsUtil.GF_LINK_TITLE);
  assertNotNull(ConstantsUtil.GF_OPEN_NEW);
  assertNotNull(ConstantsUtil.GF_THIRD_PARTY_ICON);
  assertNotNull(ConstantsUtil.GF_LINKS_URLS);
  assertNotNull(ConstantsUtil.GF_LINKS_TITLE);
  assertNotNull(ConstantsUtil.DISPLAY_MESSAGE_RESOURCE);
  assertNotNull(ConstantsUtil.FP_RESOURCE_FOLDER);
  assertNotNull(ConstantsUtil.GNAV_MESSAGE_RESOURCE);
  assertNotNull(ConstantsUtil.URL_SERVICE_PID);
  assertNotNull(ConstantsUtil.EOSPUBLIC);
  assertNotNull(ConstantsUtil.X_EOS_API_KEY);
  assertNotNull(ConstantsUtil.DCS3);
  assertNotNull(ConstantsUtil.X_DCS_API_KEY);
  assertNotNull(ConstantsUtil.CONFIG_PATH);
  assertNotNull(ConstantsUtil.COMPO_PATH);
  assertNotNull(ConstantsUtil.RESPONSE_APPLICATION_JSON);
  assertNotNull(ConstantsUtil.RESPONSE_CHARACTER_CODE);

 }
}