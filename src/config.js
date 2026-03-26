const uriConfigs = {
    // baseUrl: 'https://mmdapi.deepomics.org/',
    baseUrl: 'http://127.0.0.1:8173/',
    uri: {
        srpDirNamesViewURI: 'api/shared/srpdirnamesview',
        getTargetSrpValueURI: 'api/shared/gettargetsrpvalue',
        downloadSampleDataURI: 'api/shared/downloadsampledata',

        geoDataViewURI: 'api/database/bioproject/geodataview',
        srpProjectViewURI: 'api/database/bioproject/srpprojectview',
        srpSearchedProjectViewUIR: 'api/database/bioproject/srpsearchedprojectview',
        runProjectViewURI: 'api/database/bioproject/runprojectview',
        contigsInformationViewURI: 'api/database/bioproject/contigsinformationview',
        contigsSearchedInformationViewURI: 'api/database/bioproject/contigssearchedinformationview',


        contigProjectViewURI: 'api/database/contigproject/contigprojectview',
        contigProjectSearchedViewURI: 'api/database/contigproject/contigprojectsearchedview',

        
        proteinSeqViewURI: 'api/database/dataexpress/proteinseqview',
        proteinPdbViewURI: 'api/database/dataexpress/proteinpdbview',
        cdsVfResfinderViewURI: 'api/database/dataexpress/cdsvfresfinderView',
        proteinOneSeqViewURI: 'api/database/dataexpress/proteinoneseqview',
        binViewURI: 'api/database/dataexpress/binview',
        macrelOutPredictionViewURI: 'api/database/dataexpress/macreloutpredictionview',

        downloadListViewURI: 'api/downloadlist',
        downloadURI: 'api/download',

        analysisURI: 'api/analysis/analysisview',
        analysisMethodsURI: 'api/analysis/analysismethods',

        taskStatuesViewURI: 'api/workspace/taskstatuesview',
        downloadTaskreSultURI: 'api/workspace/downloadtaskresultview'
    }
}

export default uriConfigs

