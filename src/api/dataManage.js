import Ajax from './Ajax'
import * as mock from './mock/dataManage'
import url from './url/dataManage'

export class FindDimensionByPage extends Ajax {
  constructor (isMock) {
    super(isMock)

    this.method = 'get'
    this.mock = mock.FindDimensionByPage
    this.url = url.FindDimensionByPage
  }

  adapter (res) {
    // console.log('res', res.data)
    return res.data
  }
}

export class FindDimensionById extends Ajax {
  constructor (isMock) {
    super(isMock)

    this.method = 'get'
    this.mock = mock.FindDimensionById
    this.url = url.FindDimensionById
  }

  adapter (res) {
    // console.log('res', res.data)
    return res.data
  }
}

export class IsExistDimension extends Ajax {
  constructor (isMock) {
    super(isMock)

    this.method = 'get'
    this.mock = mock.IsExistDimension
    this.url = url.IsExistDimension
  }

  adapter (res) {
    // console.log('res', res.data)
    return res.data
  }
}

export class AddDimension extends Ajax {
  constructor (isMock) {
    super(isMock)
    this.method = 'post'
    this.mock = mock.AddDimension
    this.url = url.AddDimension
  }
}

export class UpdateDimensionById extends Ajax {
  constructor (isMock) {
    super(isMock)

    this.method = 'post'
    this.mock = mock.UpdateDimensionById
    this.url = url.UpdateDimensionById
  }
}

export class FindEventTable extends Ajax {
  constructor (isMock) {
    super(isMock)

    this.method = 'get'
    this.mock = mock.FindEventTable
    this.url = url.FindEventTable
  }

  adapter (res) {
    // console.log('res', res.data)
    return res.data
  }
}

export class FindEventTableInfo extends Ajax {
  constructor (isMock) {
    super(isMock)

    this.method = 'get'
    this.mock = mock.FindEventTableInfo
    this.url = url.FindEventTableInfo
  }

  adapter (res) {
    // console.log('res', res.data)
    return res.data
  }
}

export class FindSourceTableByPage extends Ajax {
  constructor (isMock) {
    super(isMock)

    this.method = 'get'
    this.mock = mock.FindSourceTableByPage
    this.url = url.FindSourceTableByPage
  }

  adapter (res) {
    // console.log('res', res.data)
    return res.data
  }
}

export class FindSourceTableDetail extends Ajax {
  constructor (isMock) {
    super(isMock)

    this.method = 'get'
    this.mock = mock.FindSourceTableDetail
    this.url = url.FindSourceTableDetail
  }

  adapter (res) {
    return res.data
  }
}

export class FindSourceTable extends Ajax {
  constructor (isMock) {
    super(isMock)

    this.method = 'get'
    this.mock = mock.FindSourceTable
    this.url = url.FindSourceTable
  }

  adapter (res) {
    return res.data
  }
}

export class AddSourceTable extends Ajax {
  constructor (isMock) {
    super(isMock)

    this.method = 'post'
    this.mock = mock.AddSourceTable
    this.url = url.AddSourceTable
  }
}

export class UpdateSourceTable extends Ajax {
  constructor (isMock) {
    super(isMock)

    this.method = 'post'
    this.mock = mock.UpdateSourceTable
    this.url = url.UpdateSourceTable
  }
}

export class UpdateSourceTableStatus extends Ajax {
  constructor (isMock) {
    super(isMock)

    this.method = 'post'
    this.mock = mock.UpdateSourceTableStatus
    this.url = url.UpdateSourceTableStatus
  }
}

export class FindErpInfo extends Ajax {
  constructor (isMock) {
    super(isMock)

    this.method = 'get'
    this.mock = mock.FindErpInfo
    this.url = url.FindErpInfo
  }

  adapter (res) {
    // console.log('res', res.data)
    return res.data
  }
}
