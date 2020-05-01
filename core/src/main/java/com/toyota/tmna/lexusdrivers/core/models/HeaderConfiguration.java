package com.toyota.tmna.lexusdrivers.core.models;

import com.toyota.tmna.lexusdrivers.core.factory.HeaderFactoryEndPoints;
import com.toyota.tmna.lexusdrivers.core.util.ConstantsUtil;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.fasterxml.jackson.annotation.JsonGetter;

@Model(adaptables = SlingHttpServletRequest.class, resourceType = HeaderConfiguration.RESOURCE_TYPE, adapters = {
		HeaderConfiguration.class,
		ComponentExporter.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class HeaderConfiguration implements ComponentExporter {

	protected final Logger log = LoggerFactory.getLogger(this.getClass());
	protected static final String RESOURCE_TYPE = ConstantsUtil.CONFIG_PATH;

	HeaderFactoryEndPoints headerFactory = new HeaderFactoryEndPoints();

	public String eospublic;

	public String getEospublic() {
		eospublic = headerFactory.getServiceEndpoint(ConstantsUtil.EOSPUBLIC);
		return eospublic;
	}

	public String xdcsapikey;
	@JsonGetter(ConstantsUtil.X_DCS_API_KEY)
	public String getXdcsapikey() {

		xdcsapikey = headerFactory.getServiceEndpoint(ConstantsUtil.X_DCS_API_KEY);


		return xdcsapikey;
	}

	public String xeosapikey;
	@JsonGetter(ConstantsUtil.X_EOS_API_KEY)
	public String getXeosapikey() {
		xeosapikey = headerFactory.getServiceEndpoint(ConstantsUtil.X_EOS_API_KEY);
		return xeosapikey;
	}

	public String dcs3;

	public String getDcs3() {
		dcs3 = headerFactory.getServiceEndpoint(ConstantsUtil.DCS3);
		return dcs3;
	}

	@Override
	public String getExportedType() {
		// TODO Auto-generated method stub
		return RESOURCE_TYPE;
	}
}
